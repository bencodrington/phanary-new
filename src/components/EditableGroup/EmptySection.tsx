import React from "react";
import "./EmptySection.scss";

type EmptySectionProps = {
    isLarge?: boolean;
};

export default function EmptySection({ isLarge = false }: EmptySectionProps) {
    return (
        <div className={`${isLarge ? 'is-large' : ''} empty-section-container`}>
            <span>None</span>
        </div>
    );
}