const Sidebar = ({isOpen})=>{
    return (
        <aside 
        style={{ width: isOpen ? "200px" : "60px",
            transition : "0.3s",
            borderRight: "1px solid #ddd",
            padding: "10px"
        }}
        >
            <p>Home</p>
            <p>Trending</p>
            <p>Subscription</p>
        </aside>
    );

};
export default Sidebar;
