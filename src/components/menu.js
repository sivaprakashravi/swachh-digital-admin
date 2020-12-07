import React, { useEffect, useState, useRef } from "react";
import './menu.style.scss'
const VMenu = props => {
  const menuRef = useRef();
  const [isOpen, setOpen] = useState(false);
  const onOpen = () => {
    setOpen(!isOpen);
  };
  const onSelect = name => {
    console.log(props);
    if (typeof props.onSelect != "undefined") {
      let obj = { actiontype: name, data: props.data };
      props.onSelect(obj);
    }
    setOpen(!isOpen);
  };
  useEffect(() => {
    function onClickOutsideMenuHandler(event) {
      if (!isOpen && menuRef && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    }

    document.addEventListener("click", onClickOutsideMenuHandler);
    return () => {
      document.removeEventListener("click", onClickOutsideMenuHandler);
    };
  }, [menuRef]);
  return (
    <div className={isOpen ? "v-menu show" : "v-menu"} ref={menuRef}>
      <button className="v-ellipse" onClick={()=>onOpen()}>
        &#8942;
      </button>
      <ul className="menu-dropdown">
        <li
          onClick={() => {
            onSelect("edit ok");
          }}
        >
          Edit
        </li>
        <li onClick={() => onSelect("delete")}>Delete</li>
      </ul>
    </div>
  );
};
export { VMenu };
