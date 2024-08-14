import googlePlayLogo from "./images/google-play-store.png"
import appStoreLogo from "./images/apple-app-store.png"
import { useState } from "react"

const App = () => {

  const [user, setUser] = useState(null);

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json"
        }
      }
      const response = await fetch("http://localhost:8000/register", options);
      const data = await response.json();
      console.log(data);

    } catch (err) {
      console.error(err)

    }


  }
  const updateUser = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })

  }
  console.log(user);

  return (
    <>
      <div className="auth-modal">
        <div className="close-icon">✖</div>
        <h2>Sign Up</h2>
        <p>
          By signing up you agree to our terms and conditions. Learn about our Pirvacy Policy before clicking submit.
        </p>
        <form onSubmit={registerUser}>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="email"
            onChange={updateUser}
            value={user?.email}
          />
          <input
            type="tel"
            id="tel"
            name="tel"
            placeholder="Phone Number"
            onChange={updateUser}
            value={user?.tel}
          />
          <label>
            <input type="checkbox" required />
            I agree to the terms and conditions.
          </label>
          <input
            type="submit"
            className="form-button"
          />
        </form>

        <hr />

        <h2>download the app</h2>
        <div className="link-container">
          <a href="https://play.google.com/store">
            <img src={googlePlayLogo} alt="google play icon" className="googlePlay" />
          </a>
          <a href="https://apple.com/store">
            <img src={appStoreLogo} alt="apple store icon" className="appStore" />
          </a>

        </div>
      </div>
    </>
  )
}

export default App
