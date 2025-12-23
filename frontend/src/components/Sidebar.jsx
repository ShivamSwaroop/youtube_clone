const Sidebar = ({ isOpen }) => {
  const sidebarStyle = {
    width: "200px",           
    minWidth: "200px",
    transition: "all 0.3s ease",
    borderRight: "1px solid #cfcfcf",
    background: "#020202ff",
    overflow: "hidden"
  };

  const collapsedStyle = {
    width: "60px",
    minWidth: "60px"
  };

  const itemStyle = {
    padding: "10px",
    whiteSpace: "nowrap",
    cursor: "pointer"
  };

  return (
    <aside style={{ ...sidebarStyle, ...(isOpen ? {} : collapsedStyle) }}>
      <div style={itemStyle}>
        🏠 <span style={{ display: isOpen ? "inline" : "none" , color:'#222'}}>Home</span>
      </div>

      <div style={itemStyle}>
        🔥 <span style={{ display: isOpen ? "inline" : "none" , color:'#222'}}>Trending</span>
      </div>

      <div style={itemStyle}>
        📺 <span style={{ display: isOpen ? "inline" : "none" , color:'#222'}}>Subscriptions</span>
      </div>
    </aside>
  );
};

export default Sidebar;
