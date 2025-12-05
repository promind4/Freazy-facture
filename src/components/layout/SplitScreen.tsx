import { type ReactNode } from 'react';

interface SplitScreenProps {
    left: ReactNode;
    right: ReactNode;
}

export function SplitScreen({ left, right }: SplitScreenProps) {
    return (
        <div className="flex flex-col md:flex-row items-start">
            {/* Left Pane: Form (Natural Flow) */}
            <div className="w-full md:w-1/2 bg-background border-r border-border p-4 md:p-6">
                <div className="max-w-2xl mx-auto">
                    {left}
                </div>
            </div>

            {/* Right Pane: Preview (Sticky & Scrollable) */}
            <div className="w-full md:w-1/2 bg-muted/30 p-4 md:p-6 sticky top-4 h-[calc(100vh-2rem)] overflow-y-auto">
                {right}
            </div>
        </div>
    );
}
