import React, { ReactNode } from "react";

import "./Modal.scss";
import Button from "../widgets/buttons/Button";

type ModalProps = {
  className?: string,
  title: string,
  icon: string,
  children: ReactNode,
  onClose: () => void,
}

export default function Modal({ className, title, icon, children, onClose }: ModalProps) {

  const onClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if ((event.target as HTMLElement).closest(".modal") === null) {
      // Clicked outside modal
      onClose();
    }
    // Clicked inside modal, do nothing
  }

  return (
    <div className={`${className ?? ""} modal-container`} onClick={onClick}>
      <div className="modal">
        <header>
          <div className="icon-and-title">
            <i className={`fa fa-${icon}`} />
            <h2>{title}</h2>
          </div>
          <Button
            onClick={onClose}
            icon="times"
          />
        </header>
        <main>
          {children}
        </main>
      </div>
    </div>
  )
}