const categories = [
    "All",
    "React",
    "JavaScript",
    "Node",
    "MongoDB",
    "CSS",
    "HTML"
];

const Filters = ({ selected, onSelect}) =>{
    return(
        <div style={{ margin: '10px 0'}}>
            {categories.map((cat)=>(
                <button key={cat} onClick = {()=>onSelect(cat)}
                style={{marginRight: '5px', background: selected === cat? '#a8a4a4ff' : '#fff', color: '#000'}}
                >{cat}</button>
            ))}
        </div>
    );
};

export default Filters;