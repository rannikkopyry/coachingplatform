import React from 'react';

function SuccessMessage() {
  return (
    <>
      <div className="mt-8">
        <div className="text-xl bg-lime-200 text-black p-4 opacity-70">
          <h2>🎉 You are part of the waitlist!</h2>
          <p>We'll be sure to keep you updated on our launch.</p>
        </div>
      </div>
    </>
  );
}

export default SuccessMessage;