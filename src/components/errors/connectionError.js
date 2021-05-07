const ConnectionError = () => {
  return (
    <div className="oops">
      <svg
        className="heart"
        width="70"
        height="70"
        viewBox="0 0 20 20"
        fill="none"
        fill-rule="evenodd"
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M19 4.8a16 16 0 00-2-1.2m-3.3-1.2A16 16 0 001.1 4.7M16.7 8a12 12 0 00-2.8-1.4M10 6a12 12 0 00-6.7 2M12.3 14.7a4 4 0 00-4.5 0M14.5 11.4A8 8 0 0010 10M3 16L18 2M10 18h0"></path>
      </svg>
      <br />
      <h1>Oops!</h1>
      <p>An error ocurred, you might want to check your network connection</p>
    </div>
  );
};

export default ConnectionError;
