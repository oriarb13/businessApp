import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signInUser } from "@/API/userAPI";
import { MdError } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Login = () => {
  const { loginAsGuest } = useUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");

  const validateForm = () => {
    let valid = true;

    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email || !emailRegex.test(email)) {
      setEmailError("Valid email is required");
      valid = false;
    } else {
      setEmailError("");
    }

    // Password validation
    if (!password) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const data = await signInUser(email, password);
      console.log(data);
      navigate("/profile");
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const handleGuest = () => {
    loginAsGuest();
  };

  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Sign In</h2>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700">
          Email
        </label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1"
        />
        {emailError && (
          <div className="flex items-center mt-1 text-sm text-red-600">
            <MdError className="mr-2" />
            <p>{emailError}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700">
          Password
        </label>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-500 right-2 top-2"
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {passwordError && (
          <div className="flex items-center mt-1 text-sm text-red-600">
            <MdError className="mr-2" />
            <p>{passwordError}</p>
          </div>
        )}
      </div>

      <div>
        <Button onClick={handleSubmit} className="w-full">
          Sign In
        </Button>
      </div>

      <div className="mt-4 text-center">
        <Button
          variant="link"
          onClick={() => navigate("/")}
          className="text-blue-500 hover:underline"
        >
          Don't have an account? Sign Up
        </Button>
      </div>

      <div className="mt-2 text-center">
        <Button
          variant="link"
          onClick={handleGuest}
          className="text-gray-600 hover:underline"
        >
          Enter as a Guest
        </Button>
      </div>
    </div>
  );
};

export default Login;
