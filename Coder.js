
class Coder {
    name = "";

    generatePrivateName(len, format) {
        if ((len == undefined) || (len <= 0)) { len = 1; }
        var characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';
        var iffirst = 0;
        for (var i = 0; i < len; i++) {
            if (i == 0) { iffirst = 10; } else { iffirst = 0; }
            result += characters[Math.round(Math.random() * (characters.length - iffirst - 1))];
        }
        this.name = result + format;
        return result + format;
    }

}

module.exports = new Coder();