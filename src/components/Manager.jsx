import React, { useEffect } from "react";
import { useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

function Manager() {
  const [form, setform] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setpasswordArray] = useState([]);

  useEffect(() => {
    let passwords = localStorage.getItem("passwords");
    let passwordArray;
    if (passwords) {
      setpasswordArray(JSON.parse(passwords));
    }
  }, []);
  const ref = useRef();
  const passwordRef = useRef();
  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "text";
    } else {
      ref.current.src = "icons/eyecross.png";
      passwordRef.current.type = "password";
    }
  };

  const savePassword = () => {
    console.log(form);
    setpasswordArray([...passwordArray, { ...form, id: uuidv4() }]);
    localStorage.setItem(
      "passwords",
      JSON.stringify([...passwordArray, { ...form, id: uuidv4() }])
    );
    console.log([...passwordArray, form]);
    toast.success("Password Saved Successfully");
    setform({ site: "", username: "", password: "" });
  };

  const deletePassword = (id) => {
    console.log("Delete password with id : ", id);
    let cnfrm = confirm("Do you want to delete ?");
    if (cnfrm) {
      setpasswordArray(passwordArray.filter((item) => item.id !== id));
      localStorage.setItem(
        "passwords",
        JSON.stringify(passwordArray.filter((item) => item.id !== id))
      );
    }
    toast.success("Password Deleted Successfully");
    // console.log([...passwordArray, form]);
  };

  const editPassword = (id) => {
    console.log("edit password with id : ", id);
    setform(passwordArray.filter((item) => item.id === id)[0]);
    setpasswordArray(passwordArray.filter((item) => item.id !== id));
    // console.log(form);
    // setpasswordArray([...passwordArray, {...form, id: uuidv4()}]);
    // localStorage.setItem("passwords", JSON.stringify([...passwordArray, form]));
    // console.log([...passwordArray, form]);
  };

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success("Text Copied");
  };

  return (
    <div>


      <div className=" p-2 md:p-0 md:mycontainer  ">
        <h1 className="text-4xl font-bold text-center ">
          <span className="text-purple-500">&lt;</span>
          Pass
          <span className="text-purple-500">Op/&gt;</span>
        </h1>
        <p className="text-purple-800 text-lg text-center">
          Your own Password Manager
        </p>
        <div className=" flex flex-col items-center p-4 text-black gap-8">
          <input
            value={form.site}
            onChange={handleChange}
            className="rounded-full border border-purple-500 w-full p-4 py-1"
            placeholder="Enter Website URL"
            type="text "
            name="site"
            id="site"
          />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input
              value={form.username}
              onChange={handleChange}
              className="rounded-full border border-purple-500 w-full p-4 py-1"
              placeholder="Enter User Name"
              type="text "
              name="username"
              id="username"
            />
            <div className="relative">
              <input
                ref={passwordRef}
                value={form.password}
                onChange={handleChange}
                className="rounded-full border border-purple-500 w-full p-4 py-1"
                placeholder="Enter Password"
                type="password"
                name="password"
                id="password"
              />
              <span
                className="absolute top-[8px] right-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={26}
                  src="icons/eyecross.png"
                  alt="eye"
                />
              </span>
            </div>
          </div>

          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-purple-400 rounded-full px-8 py-2 w-fit hover:bg-purple-300 gap-2 border border-purple-700"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        <div className="passwords">
          <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}
          {passwordArray.length !== 0 && (
            <table className="table-auto w-full rounded-md overflow-hidden mb-10">
              <thead className=" bg-purple-800 text-white ">
                <tr>
                  <th className="py-2 text-sm md:text-lg">Site</th>
                  <th className="py-2 text-sm md:text-lg">Username</th>
                  <th className="py-2 text-sm md:text-lg">Password</th>
                  <th className="py-2 text-sm md:text-lg">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-purple-200">
                {passwordArray.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td className="  border border-white py-2 text-center text-sm md:text-lg ">
                        <div className="flex justify-center items-center">
                          <a href={item.site} target="_blank">
                            {item.site}
                          </a>

                          <img
                            onClick={() => copyText(item.site)}
                            className="cursor-pointer ml-4"
                            width={20}
                            src="icons/copy.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className=" border border-white py-2 text-center text-sm md:text-lg ">
                        <div className="flex justify-center items-center">
                          <span>{item.username}</span>
                          <img
                            onClick={() => copyText(item.username)}
                            className="cursor-pointer ml-4"
                            width={20}
                            src="icons/copy.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className=" border border-white py-2 text-center ">
                        <div className="flex justify-center items-center">
                          <span>{item.password}</span>
                          <img
                            onClick={() => copyText(item.password)}
                            className="cursor-pointer ml-4"
                            width={20}
                            src="icons/copy.png"
                            alt=""
                          />
                        </div>
                      </td>
                      <td className=" border border-white py-2 text-center text-sm md:text-lg ">
                        <div className="flex justify-center items-center gap-x-2">
                          <span onClick={() => editPassword(item.id)}>
                            <img
                              className="cursor-pointer"
                              width={25}
                              src="icons/edit.png"
                              alt=""
                            />
                          </span>
                          <span onClick={() => deletePassword(item.id)}>
                            <lord-icon
                              src="https://cdn.lordicon.com/wpyrrmcq.json"
                              trigger="hover"
                              style={{ width: "25px", cursor: "pointer" }}
                            ></lord-icon>
                          </span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Manager;
