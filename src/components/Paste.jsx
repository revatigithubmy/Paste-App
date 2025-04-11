// Paste.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFromPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FiSearch } from 'react-icons/fi';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(pasteId) {
    const url = `${window.location.origin}/pastes/${pasteId}`;
    navigator.clipboard.writeText(url);
    toast.success("Link copied to clipboard!");
  }

  return (
    <div className="p-6">
      <Toaster position="top-center" />
      <div className="relative w-[600px] mt-5">
        <input
          className="p-2 pl-10 rounded-2xl w-full bg-gray-500 text-white"
          type="search"
          placeholder="Search here"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FiSearch className="absolute left-3 top-3 text-white text-xl" />
      </div>

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 &&
          filteredData.map((paste) => (
            <div key={paste?._id} className="border p-4 rounded bg-white shadow">
              <div className="font-bold text-lg">{paste.title}</div>
              <div className="text-gray-700">{paste.content}</div>
              <div className="flex flex-row gap-4 justify-evenly mt-3">
                <button className="text-blue-500 underline">
                  <Link to={`/?pasteId=${paste._id}`}>Edit</Link>
                </button>
                <button className="text-green-500 underline">
                  <Link to={`/pastes/${paste._id}`}>View</Link>
                </button>
                <button
                  className="text-red-500 underline"
                  onClick={() => handleDelete(paste._id)}
                >
                  Delete
                </button>
                <button
                  className="text-purple-500 underline"
                  onClick={() => {
                    navigator.clipboard.writeText(paste?.content);
                    toast.success('Copied to clipboard');
                  }}
                >
                  Copy
                </button>
                <button  className="text-amber-400" onClick={() => handleShare(paste._id)}>Share</button>
              </div>
              <div className="text-sm text-gray-500 mt-2">{paste.createdAt}</div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Paste;
