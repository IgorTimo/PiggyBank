import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <div className="m-auto">
      <Header />
      {children}
    </div>
  );
};

export default Layout;
