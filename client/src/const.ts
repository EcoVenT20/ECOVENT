export const getLoginUrl = () => {
  try {
    const baseUrl = "https://auth.manus.im";
    const clientId = "dummy_id";
    const redirectUri = encodeURIComponent("http://localhost:3000/api/oauth/callback" );
    return `${baseUrl}/login?client_id=${clientId}&redirect_uri=${redirectUri}`;
  } catch (e) {
    console.error("Error building login URL", e);
    return "#";
  }
};
