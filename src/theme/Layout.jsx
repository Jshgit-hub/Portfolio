// components/Layout.jsx
const Layout = ({ children }) => {
    return (
        <div className="px-6 md:px-20 lg:px-32 max-w-screen-xl mx-auto">
            {children}
        </div>
    );
};

export default Layout;
