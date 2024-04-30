import React from "react";
import "./SectionHeader.scss";

type SectionHeaderProps = {
    icon: string;
    text: string;
    hasExtraMargin?: boolean;
};

export default function SectionHeader({ icon, text, hasExtraMargin = false }: SectionHeaderProps) {
    return (
        <div className={`${hasExtraMargin ? 'has-extra-margin' : ''} section-header-container`}>
            <i className={`fa-solid fa-${icon}`} />
            <span>{text}</span>
        </div>
    );
}