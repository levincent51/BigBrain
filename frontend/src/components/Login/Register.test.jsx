import React from 'react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from './Register'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import fetchAPI from '../../utilities/fetch'
import { Context } from '../../context'

jest.mock('../../utilities/fetch')

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}))

describe('Register', () => {
  it('renders with all the text fields', () => {
    render(
      <BrowserRouter>
        <Register/>
      </BrowserRouter>
    )

    expect(screen.getByText('Register')).toBeInTheDocument()
    // 4 fields should be present
    expect(screen.getAllByRole('textbox').length === 4)

    expect(screen.getByRole('textbox', { name: /full name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email address/i })).toBeInTheDocument()
    expect(screen.getAllByLabelText(/password/i))
    expect(screen.getByLabelText(/confirm password/i))

    // register button should be present
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
  })

  it('populate happy path allows submit', async () => {
    fetchAPI.mockResolvedValue({ token: 'mockToken' })
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)
    const setToken = jest.fn()
    const setters = { setToken }
    render(
      <Context.Provider value={{ setters }}>
        <BrowserRouter>
          <Register/>
        </BrowserRouter>
      </Context.Provider>
    )
    const registerButton = screen.getByRole('button', { name: /register/i })
    const name = screen.getByRole('textbox', { name: /full name/i })
    const email = screen.getByRole('textbox', { name: /email address/i })
    const pass = screen.getAllByLabelText(/password/i)[0]
    const confirm = screen.getByLabelText(/confirm password/i)

    userEvent.type(name, 'Test')
    userEvent.type(email, 'Test@mail.com')
    userEvent.type(pass, '123')
    userEvent.type(confirm, '123')

    // when submitting, no front-end validation
    userEvent.click(registerButton)
    await screen.findByRole('button', { name: /register/i }) // Wait for the promise to resolve

    expect(fetchAPI).toHaveBeenCalledTimes(1)
    // expect successfull call of API
    expect(fetchAPI).toHaveBeenCalledWith('POST', null, 'admin/auth/register', {
      name: 'Test',
      email: 'Test@mail.com',
      password: '123'
    })
    // expect successfull redirect
    expect(setters.setToken).toHaveBeenCalledTimes(1)
    expect(navigate).toHaveBeenCalledWith('/')
  })

  it('submit with no input', async () => {
    render(
      <BrowserRouter>
        <Register/>
      </BrowserRouter>
    )
    const registerButton = screen.getByRole('button', { name: /register/i })

    // when submitting with no input, validation should show
    userEvent.click(registerButton)
    expect(await screen.findByText(/name is required!/i)).toBeInTheDocument()
    expect(await screen.findByText(/email is required!/i)).toBeInTheDocument()
    expect(await screen.findByText(/password is required!/i)).toBeInTheDocument()
  })

  it('populate with invalid inputs', async () => {
    render(
      <BrowserRouter>
        <Register/>
      </BrowserRouter>
    )
    const registerButton = screen.getByRole('button', { name: /register/i })
    const name = screen.getByRole('textbox', { name: /full name/i })
    const email = screen.getByRole('textbox', { name: /email address/i })
    const pass = screen.getAllByLabelText(/password/i)[0]
    const confirm = screen.getByLabelText(/confirm password/i)

    // provide invalid name, email and mismatch password
    userEvent.type(name, '123invalidname')
    userEvent.type(email, 'Testmail.com')
    userEvent.type(pass, '123')
    userEvent.type(confirm, '1234')

    // when submitting, validation should show
    userEvent.click(registerButton)
    expect(await screen.findByText(/This is not a valid name!/i)).toBeInTheDocument()
    expect(await screen.findByText(/This is not a valid email format!/i)).toBeInTheDocument()
    expect(await screen.findByText(/Passwords must match!/i)).toBeInTheDocument()
  })

  it('fill in with only keyboard', async () => {
    fetchAPI.mockResolvedValue({ token: 'mockToken' })
    const navigate = jest.fn()
    useNavigate.mockReturnValue(navigate)
    const setToken = jest.fn()
    const setters = { setToken }
    render(
      <Context.Provider value={{ setters }}>
        <BrowserRouter>
          <Register/>
        </BrowserRouter>
      </Context.Provider>
    )

    // only useing keyboard, should be able to fill in form.
    userEvent.keyboard('Test')
    userEvent.tab()
    userEvent.keyboard('Test2@mail.com')
    userEvent.tab()
    userEvent.keyboard('123')
    userEvent.tab()
    userEvent.keyboard('123')
    userEvent.tab()

    // when submitting, no front-end validation
    userEvent.keyboard('{enter}')

    expect(fetchAPI).toHaveBeenCalledTimes(1)

    // expect successfull call of API
    expect(fetchAPI).toHaveBeenCalledWith('POST', null, 'admin/auth/register', {
      name: 'Test',
      email: 'Test2@mail.com',
      password: '123'
    })
  })
})
