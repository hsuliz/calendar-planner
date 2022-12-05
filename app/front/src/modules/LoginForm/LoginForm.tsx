import React, { useState } from 'react';
import { Button, InputGroup, Intent } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import * as P from './parts';

function LoginForm() {
    const [showPassword, setShowPassword] = useState(false);

    const handleLockClick = () => {
        setShowPassword((prevState) => !prevState)
    }

    const lockButton = (
        <Tooltip2 content={`${showPassword ? "Hide" : "Show"} Password`}>
            <Button
                icon={showPassword ? "unlock" : "lock"}
                intent={Intent.WARNING}
                onClick={handleLockClick}
            />
        </Tooltip2>
    );

	return (
        <P.LoginFormWrapper className='bp4-dark'>
            <InputGroup
                placeholder="Email..."
            />

            <InputGroup
                placeholder="Enter your password..."
                rightElement={lockButton}
                type={showPassword ? "text" : "password"}
            />
        </P.LoginFormWrapper>
	);
}

export default LoginForm;
