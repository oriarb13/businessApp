import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@radix-ui/react-label";
import { createUser } from "@/API/userAPI";
import { MdError } from "react-icons/md";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [plan, setPlan] = useState<"Standard" | "Gold" | "Platinum">(
    "Standard"
  );
  const [image, setImage] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [imageError, setImageError] = useState("");

  const validateForm = () => {
    let valid = true;

    // Username validation
    if (!username) {
      setUsernameError("Username is required");
      valid = false;
    } else {
      setUsernameError("");
    }

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

    // Confirm Password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError("Passwords do not match");
      valid = false;
    } else {
      setConfirmPasswordError("");
    }

    setImageError("");

    return valid;
  };

  const handleSubmit = async () => {
    if (!image) setImage("https://via.placeholder.com/150");
    if (!validateForm()) return;

    try {
      const data = await createUser(username, email, password, plan, image);
      console.log(data);
      navigate("/login");
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };


  return (
    <div className="max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg">
      <h2 className="mb-4 text-xl font-bold">Sign Up</h2>

      <div className="mb-4">
        <label htmlFor="username" className="block text-gray-700">
          Username
        </label>
        <Input
          id="username"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mt-1"
        />
        {usernameError && (
          <div className="flex items-center mt-1 text-sm text-red-600">
            <MdError className="mr-2" />
            <p>{usernameError}</p>
          </div>
        )}
      </div>

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

      <div className="mb-4">
        <label htmlFor="confirmPassword" className="block text-gray-700">
          Confirm Password
        </label>
        <div className="relative">
          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute text-gray-500 right-2 top-2"
          >
            {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        </div>
        {confirmPasswordError && (
          <div className="flex items-center mt-1 text-sm text-red-600">
            <MdError className="mr-2" />
            <p>{confirmPasswordError}</p>
          </div>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="plan" className="block text-gray-700">
          Plan
        </label>
        <RadioGroup
          value={plan}
          onValueChange={(newValue) =>
            setPlan(newValue as "Standard" | "Gold" | "Platinum")
          }
          className="flex flex-row justify-center mt-2"
        >
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="Standard" id="r1" />
            <Label htmlFor="r1" className="text-gray-700">
              Standard
            </Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="Gold" id="r2" />
            <Label htmlFor="r2" className="text-gray-700">
              Gold
            </Label>
          </div>
          <div className="flex items-center space-x-4">
            <RadioGroupItem value="Platinum" id="r3" />
            <Label htmlFor="r3" className="text-gray-700">
              Platinum
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="mb-4">
        <label htmlFor="image" className="block text-gray-700">
          Profile Image
        </label>
        <Input
          id="image"
          type="url"
          placeholder="Enter image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="mt-1"
        />
        {imageError && (
          <div className="flex items-center mt-1 text-sm text-red-600">
            <MdError className="mr-2" />
            <p>{imageError}</p>
          </div>
        )}
      </div>

      <div>
        <Button onClick={handleSubmit} className="w-full">
          Sign Up
        </Button>
      </div>

      <div className="flex justify-between mt-4">
        <Button
          onClick={() => navigate("/login")}
          variant="link"
          className="w-full ml-2 text-center"
        >
          Already have an account? Log In
        </Button>
      </div>
    </div>
  );
};

export default SignUp;
