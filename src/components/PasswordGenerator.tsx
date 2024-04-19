import { useCallback, useEffect, useRef, useState } from "react";

export default function PasswordGenerator() {
  const [length, setLength] = useState<number>(8);
  const [number, setNumber] = useState<boolean>(false);
  const [sym, setsym] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");

  // useRef
  const passwordRef = useRef<HTMLInputElement>(null);

  // useCallback
  const generatePassword = useCallback(() => {
    let pass: string = "";
    let char: string = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

    if (number) char += "0123456789";
    if (sym) char += '!@#$%^&*()_+<>?:"{}[];/.,';

    for (let i = 0; i < length; i++) {
      let random = Math.floor(Math.random() * char.length);

      pass += char.charAt(random);
    }
    setPassword(pass);
  }, [length, number, sym, setPassword]);

  // copy text
  const copy = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 100);

    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    generatePassword();
  }, [length, number, sym, setPassword]);
  return (
    <>
      <div className="w-full h-screen bg-slate-900 grid place-items-center">
        <div className="flex flex-col items-center px-4 py-4 bg-slate-100 rounded-md">
          <div className="flex">
            <input
              type="text"
              value={password}
              placeholder={password}
              ref={passwordRef}
              readOnly
              className="outline-none rounded-l-lg border-none px-3 py-2 bg-slate-950 shadow-2xl text-lg font-medium text-white"
            />
            <div
              className="bg-blue-600 h-full text-lg  px-3 py-2  rounded-r-lg text-white font-medium"
              onClick={copy}
            >
              Copy
            </div>
          </div>
          <div className="flex gap-2 mt-4 items-center justify-center">
            <input
              type="range"
              min={6}
              max={30}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="bg-purple-900 px-2 py-1 rounded" htmlFor="">
              {length}
            </label>
            <input
              type="checkbox"
              defaultChecked={number}
              onChange={() => {
                setNumber((e) => !e);
              }}
              className="rounded-full border-none outline-none"
            />
            <label htmlFor="">Number</label>
            <input
              type="checkbox"
              defaultChecked={sym}
              onChange={() => {
                setsym((e) => !e);
              }}
            />
            <label htmlFor="">sym</label>
          </div>
        </div>
      </div>
    </>
  );
}
