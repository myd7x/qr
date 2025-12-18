export default function GoogleButton() {
  const handleGoogleLogin = () => {
    window.location.href =
      "https://qrguard.onrender.com/auth/google";
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="w-full flex items-center justify-center gap-3
                 rounded-lg border border-zinc-700
                 bg-black/40 py-3 text-sm
                 hover:border-emerald-500 transition"
    >
      <image
        href="https://www.svgrepo.com/show/475656/google-color.svg"
        className="w-5 h-5"
      />
      Continue with Google
    </button>
  );
}
