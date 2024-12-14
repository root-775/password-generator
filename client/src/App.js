import './App.css';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'
import Swal from 'sweetalert2'
import { MdDelete } from "react-icons/md";


function App() {
	const [password, setPassword] = useState("");
	const [passwordType, setPasswordType] = useState("");
	const [passwordLength, setPasswordLength] = useState(8);
	const [checkedItems, setCheckedItems] = useState({
		uppercase: false,
		lowercase: false,
		numbers: false,
		symbols: false,
		complexity: 'all-characters',
	});
	const [passwords, setPasswords] = useState([])

	const handleCheckboxChange = (event) => {
		const { name, value, type, checked } = event.target;
		if (type === "checkbox") {
			setCheckedItems((prev) => ({
				...prev,
				[name]: checked,
			}));
		} else if (type === "radio") {
			setCheckedItems((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const changeRange = (e) => {
		const len = e.target.value;
		if (len >= 1) {
			setPasswordLength(e.target.value);
		} else {
			alert("Can't be less than 1");
		}
	};

	const handlePasswordTypeChange = (e) => {
		setPasswordType(e.target.value)
	}

	const passwordGenerator = useCallback(() => {
		let charsetFinal = "";
		const charsetLowerCase = "abcdefghijklmnopqrstuvwxyz";
		const charsetUpperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		const charsetNumbers = "1234567890";
		const charsetSymbols = "!@#$%^&*()_-+=<>?";

		if (checkedItems.lowercase || checkedItems.complexity === 'all-characters' || checkedItems.complexity === 'easy-say' || checkedItems.complexity === 'easy-read') {
			charsetFinal += charsetLowerCase;
		}
		if (checkedItems.uppercase || checkedItems.complexity === 'all-characters' || checkedItems.complexity === 'easy-say' || checkedItems.complexity === 'easy-read') {
			charsetFinal += charsetUpperCase;
		}
		if (checkedItems.numbers || checkedItems.complexity === 'all-characters' || checkedItems.complexity === 'easy-read') {
			charsetFinal += charsetNumbers;
		}
		if (checkedItems.symbols || checkedItems.complexity === 'all-characters') {
			charsetFinal += charsetSymbols;
		}

		let generatedPassword = "";
		for (let index = 0; index < passwordLength; index++) {
			const randomIndex = Math.floor(Math.random() * charsetFinal.length);
			generatedPassword += charsetFinal[randomIndex];
		}
		setPassword(generatedPassword);
	}, [checkedItems, passwordLength]);

	const savePassword = async () => {
		if (!passwordType) {
			Swal.fire({
				position: "top",
				icon: "error",
				title: "Password Type is Required",
				showConfirmButton: false,
				timer: 1500
			});
			return;
		}
		const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/v1/password`, {
			passwordValue: password,
			passwordType: passwordType,
			generationMode: checkedItems.complexity
		});
		if (res.data.status) {
			setPasswordType("");
			getAllPasswords();
			Swal.fire({
				position: "top-end",
				icon: "success",
				title: "Password is Saved",
				showConfirmButton: false,
				timer: 1500
			});
		}
	}

	const getAllPasswords = async () => {
		await axios.get(`${process.env.REACT_APP_API_URL}/api/v1/passwords`)
			.then((req) => {
				setPasswords(req.data.passwords);
			}).catch((error) => {
				console.log(error);
			});
	}

	const deletePassword = async (_id) => {
		await axios.delete(`${process.env.REACT_APP_API_URL}/api/v1/password/${_id}`)
			.then((req) => {
				getAllPasswords();
			}).catch((error) => {
				console.log(error);
			});
	}

	useEffect(() => {
		getAllPasswords();
		passwordGenerator();
	}, [passwordGenerator]);

	return (
		<>
			<div className="container mt-5 p-5">
				<div className="password-display">
					<input type="text" value={password} onClick={() => {
						alert(password + ' Copied!')
						navigator.clipboard.writeText(password)
					}} disabled />
					<div className="icons">
						<button id="copy-btn" title="Copy Password" onClick={() => {
							alert(password + ' -  Copied!')
							navigator.clipboard.writeText(password)
						}}>📋</button>
						<button id="refresh-btn" title="Generate New Password" onClick={passwordGenerator}>🔄</button>
					</div>
				</div>
				<div className="password-settings">
					<h2>Customize your password</h2>
					<div className="setting">
						<label htmlFor="password-length">Password Length</label>
						<input type="number" max={100} value={passwordLength} onChange={(e) => changeRange(e)} />
						<input type="range" value={passwordLength} max={100} onChange={(e) => changeRange(e)} />
					</div>
					<div className="setting">
						<label>
							<input type="radio" name="complexity" value="easy-say" checked={checkedItems.complexity === "easy-say"} onChange={handleCheckboxChange} /> Easy to say
						</label>
						<label>
							<input type="radio" name="complexity" value="easy-read" checked={checkedItems.complexity === "easy-read"} onChange={handleCheckboxChange} /> Easy to read
						</label>
						<label>
							<input type="radio" name="complexity" value="all-characters" checked={checkedItems.complexity === "all-characters"} onChange={handleCheckboxChange} /> All characters
						</label>
					</div>
					<div className="checkbox-group">
						<label>
							<input type="checkbox" name="uppercase" checked={checkedItems.uppercase} onChange={handleCheckboxChange} /> Uppercase
						</label>
						<label>
							<input type="checkbox" name="lowercase" checked={checkedItems.lowercase} onChange={handleCheckboxChange} /> Lowercase
						</label>
						<label>
							<input type="checkbox" name="numbers" checked={checkedItems.numbers} onChange={handleCheckboxChange} /> Numbers
						</label>
						<label>
							<input type="checkbox" name="symbols" checked={checkedItems.symbols} onChange={handleCheckboxChange} /> Symbols
						</label>
					</div>
				</div>
				<label htmlFor="password-type">Password Type</label>
				<input id='password-type' value={passwordType} onChange={(e) => handlePasswordTypeChange(e)} style={{ marginRight: '50px' }} />
				<button id="generate-btn" className="generate-btn" onClick={() => savePassword()}>Save Password</button>

				<div className='container'>
					<table className='table-bordered' style={{ width: '100%', marginTop: '10px' }}>
						<thead>
							<th>Password</th>
							<th>Password Type</th>
							<th>Generation Mode</th>
							<th>Created At</th>
							<th>Action</th>
						</thead>
						<tbody>
							{passwords.map((pws) => (
								<>
									<tr key={pws._id}>
										<td>{pws.passwordValue}</td>
										<td>{pws.passwordType}</td>
										<td>{pws.generationMode}</td>
										<td>{pws.createdAt}</td>
										<td>
											<div>
												<MdDelete onClick={() => deletePassword(pws._id)} size={25} color='red' style={{ cursor: 'pointer' }} />
											</div>
										</td>
									</tr>
								</>
							))}
						</tbody>
					</table>
				</div>
			</div>

		</>
	);
}

export default App;
