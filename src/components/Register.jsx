import { useContext, useRef, useState } from "react";
import MovieContext from "../context/MovieContext";
import { auth, db } from "../firebase-config.js";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
	const emailRef = useRef();
	const passwordRef = useRef();
	const passwordConfirmRef = useRef();
	const [error, setError] = useState();
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const { currentUser } = useContext(MovieContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		// setLoading((prevState) => !prevState);

		if (passwordRef.current.value !== passwordConfirmRef.current.value) {
			return setError("Passwords do not match!");
		}

		fetch("http://127.0.0.1:5000/register", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: emailRef.current.value,
				password: passwordRef.current.value,
			}),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.success === true) {
					navigate("/login");
				} else {
					setError(data.success);
				}
			});

	};

	return (
		<div className="flex justify-center content-center mt-32">
			<div className="card w-96 bg-base-100 shadow-xl card-bordered border-red-200 hover:shadow-red-200">
				<div className="card-title flex justify-center mt-3 ">Sign Up</div>
				<div className="card-body ">
					<form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
						<label className="input-group w-full ">
							<span className="flex justify-center w-3/12">Email</span>
							<input
								type="email"
								ref={emailRef}
								required
								placeholder="example@example.com"
								className="input input-bordered input-primary w-8/12"
							/>
						</label>
						<label className="input-group w-full ">
							<span className="flex justify-center w-3/12">Password</span>
							<input
								type="password"
								ref={passwordRef}
								required
								placeholder="********"
								className="input input-bordered input-primary w-8/12"
							/>
						</label>
						<label className="input-group w-full ">
							<span className="flex justify-center w-3/12">Confirm</span>
							<input
								type="password"
								ref={passwordConfirmRef}
								required
								placeholder="********"
								className="input input-bordered input-primary w-8/12"
							/>
						</label>
						{error && <h4>{error}</h4>}
						<div className="card-actions justify-center mt-10">
							<button
								className="btn btn-secondary"
								type="submit"
								disabled={loading}
							>
								Sign Up
							</button>
						</div>
						<div className="flex justify-center mt-3">
							<Link to="/login" className="justify-center hover:text-red-200">
								Already have an account ?{" "}
							</Link>
						</div>
					</form>
				</div>
			</div>

		</div>
	);
};

export default Register;
