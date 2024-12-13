import { useCallback, useEffect, useState, useRef } from 'react'

function App() {

  const [length, setLength] = useState(6);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');

  // useRef hook
  const passwordRef = useRef<HTMLInputElement>(null);

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += "!@#$%^&*_-+=[]{}~`";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, numberAllowed, charAllowed])

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-300">  
      <div className='w-full max-w-md bg-white p-6 rounded-lg shadow-lg'>
        <h1 className="text-center text-2xl font-bold text-gray-800 mb-6">Password Generator</h1>

        {/* Password display and copy section */}
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={password}
            className="w-full py-3 px-4 text-lg text-gray-700 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
            placeholder="Generated password"
            ref={passwordRef}
            readOnly
          />
          <button
            className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 active:bg-blue-800 transition duration-200"
            onClick={copyPasswordToClipboard}>
            Copy
          </button>
        </div>

        {/* Password length and options */}
        <div className="space-y-4">
          {/* Length range */}
          <div className="flex items-center justify-between">
            <label className="text-gray-700">Length: {length}</label>
            <input
              type="range"
              min={4} max={60}
              value={length}
              className="w-full bg-gray-200 rounded-lg"
              onChange={(e) => setLength(Number(e.target.value))}
            />
          </div>

          {/* Options for numbers and special characters */}
          <div className="flex justify-between space-x-4">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="numberInput"
                checked={numberAllowed}
                onChange={() => setNumberAllowed(prev => !prev)}
                className="accent-indigo-600"
              />
              <label htmlFor="numberInput" className="text-gray-700">Include Numbers</label>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="charInput"
                checked={charAllowed}
                onChange={() => setCharAllowed(prev => !prev)}
                className="accent-indigo-600"
              />
              <label htmlFor="charInput" className="text-gray-700">Include Special Characters</label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
