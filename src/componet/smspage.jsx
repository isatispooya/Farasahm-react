import React, { useState, useRef } from 'react';

const Smspage = () => {
  const [message, setMessage] = useState('');
  const [preview, setPreview] = useState(''); 
  const words = ['سلام', 'چطورید؟', 'تاریخ', 'ایساتیس پویا', 'صنایع مفتول', 'فیلتر', 'فراسهم', 'کارگزاری', 'اطلاعات'];
  const textareaRef = useRef(null);

  const handleWordSelect = (word) => {
    setMessage((prevMessage) => prevMessage + ' ' + word + ' ');
    textareaRef.current.focus();
  };

  const handlePreview = () => {
    setPreview(message);  
  };

  return (
    <div dir='rtl' className="flex flex-col  items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="flex w-full max-w-4xl space-x-4">
        <div className="w-1/5 bg-white rounded-lg shadow-lg p-4 overflow-y-auto  max-h-96">
          <div className="flex flex-col space-y-2">
            {words.map((word, index) => (
              <button
                key={index}
                onClick={() => handleWordSelect(word)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
              >
                {word}
              </button>
            ))}
          </div>
        </div>

        <textarea
          ref={textareaRef}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-2/3 h-96 p-4 text-lg border rounded-lg shadow-lg"
          placeholder="پیام خود را بنویسید..."
          style={{ direction: 'rtl' }}
        />
      </div>

      <button
        onClick={handlePreview}
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md self-center mt-4'
      >
        پیش نمایش
      </button>

      {preview && (
        <div className="mt-6 p-4 w-full max-w-4xl bg-white rounded-lg shadow-lg">
          <h3 className="text-lg  mb-2">پیش‌ نمایش پیام:</h3>
          <p className="text-gray-700" style={{ whiteSpace: 'pre-wrap', direction: 'rtl' }}>
            {preview}
          </p>
        </div>
      )}
    </div>
  );
};

export default Smspage;
