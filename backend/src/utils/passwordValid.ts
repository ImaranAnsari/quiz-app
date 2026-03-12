const isPasswordValid = async (password: String) => {
    let flag = 0;
    if (
        password.indexOf("!") == -1 &&
        password.indexOf("@") == -1 &&
        password.indexOf("#") == -1 &&
        password.indexOf("$") == -1 &&
        password.indexOf("*") == -1
    ) {
        return false;
    }
    for (let ind = 0; ind < password.length; ind++) {
        let ch = password.charAt(ind);
        if (ch >= "a" && ch <= "z") {
            flag = 1;
            break;
        }
        flag = 0;
    }
    if (!flag) {
        return false;
    }
    flag = 0;
    for (let ind = 0; ind < password.length; ind++) {
        let ch = password.charAt(ind);
        if (ch >= "A" && ch <= "Z") {
            flag = 1;
            break;
        }
        flag = 0;
    }
    if (!flag) {
        return false;
    }
    flag = 0;
    for (let ind = 0; ind < password.length; ind++) {
        let ch = password.charAt(ind);
        if (ch >= "0" && ch <= "9") {
            flag = 1;
            break;
        }
        flag = 0;
    }
    if (flag) {
        return true;
    }
    return false;
};

export { isPasswordValid };
