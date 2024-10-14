type WelcomeProps = {
  username: string;
};

export default function Welcome({ username }: WelcomeProps) {
  return (
    <>
      <h2>Welcome back {username}</h2>
    </>
  );
}
