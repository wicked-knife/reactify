import React, { FC, useEffect } from "react";
import ReactDOM from "react-dom";
export interface ModalProps {
  visible: boolean;
}

const ModalTemplate: FC = () => {
  return (
    <div className="rf-modal-root">
      <div className="rf-modal-mask"></div>
      <div className="rf-modal">this is modal</div>
    </div>
  );
};

// 手动将 modal 渲染至body根结点
const renderModal = () => {
  const div = document.createElement("div");
  ReactDOM.render(<ModalTemplate />, div);
  document.body.appendChild(div);
  return div;
};

// 手动将 modal 从body根节点移除
const unmountModal = (dom: HTMLElement) => {
  ReactDOM.unmountComponentAtNode(dom);
  dom.remove();
};

interface ModalInterface extends FC<ModalProps> {
  wrapper?: HTMLDivElement | null;
}

const Modal: ModalInterface = ({ visible }) => {

  useEffect(() => {
    if (visible) {
      !Modal.wrapper && (Modal.wrapper = renderModal());
    } else {
      Modal.wrapper && unmountModal(Modal.wrapper);
      Modal.wrapper = null;
    }
  }, [visible])
  
  return null;
};

export default Modal;
