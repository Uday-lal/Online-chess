"use clint";

function ConnectButton(props) {
  const handleClick = () => {
    // ..
  };
  return (
    <button className={props.className} style={props.style}>
      {props.children}
    </button>
  );
}

export default ConnectButton;
