const GenerateCode = (codeLength: number) => {
    const number = String(Math.random()).split('.')[1].split('');

    const length = number.length;

    let code = '';

    if (!codeLength) {
        codeLength = 8;
    }

    for (let i = 0; i < codeLength; i += 1) {
        code += number[length - (i + 1)];
    }

    return code;
}

export default GenerateCode;