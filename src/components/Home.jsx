import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import toast, { Toaster } from 'react-hot-toast';

const Home = () => {
  const [title, setTitle] = useState('');
  const [value, setValue] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");

  const dispatch = useDispatch();
  const allPastes = useSelector((state) => state.paste.pastes);

  useEffect(() => {
    if (pasteId) {
      const paste = allPastes.find((p) => p._id === pasteId);
      setTitle(paste?.title || '');
      setValue(paste?.content || '');
    }
  }, [pasteId]);

  function createPaste() {
    const paste = {
      title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPastes(paste));
      toast.success('Paste Updated!');
    } else {
      dispatch(addToPastes(paste));
      toast.success('Paste Created!');
    }

    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="min-h-screen px-6 py-10 bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors">
      <Toaster position="top-center" />

      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-xl p-8 border border-gray-300 dark:border-gray-700 transition-all">
        <h1 className="text-3xl font-bold mb-6 text-center text-purple-700 dark:text-purple-300 transition">📝 {pasteId ? 'Edit Paste' : 'Create New Paste'}</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-lg border border-purple-300 dark:border-purple-500 bg-purple-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:ring-2 focus:ring-purple-400 transition-all"
          />

          <button
            onClick={createPaste}
            className="bg-purple-600 hover:bg-purple-700 text-gray-500 px-6 py-3 rounded-lg shadow-md transition-all"
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>
        </div>

        <textarea
          placeholder="Enter content here"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          className="w-full p-4 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-purple-300 transition-all font-mono"
        ></textarea>
      </div>
    </div>
  );
};

export default Home;
