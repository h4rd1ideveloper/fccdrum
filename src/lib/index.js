import React, { useMemo } from 'react';

export function Memorize({fact = ()=>(<div>Miss JSXElement</div>), deps = []}) {
    return (
        useMemo(fact, deps)
    )
}