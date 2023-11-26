function rot(string) {
    let inp = [];
    let n = string.length;
    let a = string.split('');
    let string1 = '';
    
    for (let i = 0; i < n; i++) {
        let b = a[i].charCodeAt(0);
        let rot;
        
        if (b === 32) {
            rot = 32;
        } else if (b >= 48 && b <= 57) {
            rot = (9 - parseInt(String.fromCharCode(b))).toString().charCodeAt(0);
        } else if ((b >= 78 && b <= 90) || b >= 110) {
            rot = b - 13;
        } else {
            rot = b + 13;
        }
        
        let can = String.fromCharCode(rot);
        inp.push(can);
    }
    
    for (let j = 0; j < inp.length; j++) {
        string1 += inp[j];
    }
    
    return string1;
}

function check_ascii(a) {
    for (let i = 65; i < 123; i++) {
        if (i > 90 && i < 103) {
            continue;
        } else {
            if (a === i) {
                return true;
            }
        }
    }
    return false;
}

function generate_int() {
    let gen_int = [];
    let n = Math.floor(Math.random() * (90 - 65 + 1) + 65);
    let p = Math.floor(Math.random() * (122 - 103 + 1) + 103);
    gen_int.push(n);
    gen_int.push(p);
    return gen_int[Math.floor(Math.random() * gen_int.length)];
}

function special_encode(a) {
    let ref = ['(', '~', '!', '@', '#', '$', '%', '&', '*', ')'];
    let b = a.split('');
    let string = '';
    
    for (let i = 0; i < b.length; i++) {
        let asc = b[i].charCodeAt(0);
        let lst_asc = asc.toString().split('');
        
        for (let j = 0; j < lst_asc.length; j++) {
            let ind = lst_asc[j];
            let char = ref[parseInt(ind)];
            string += char;
        }
        
        string += '|';
    }
    
    return string;
}

function special_decode(a) {
    a = a.replace(/ /g, '');
    let ref = ['(', '~', '!', '@', '#', '$', '%', '&', '*', ')'];
    let b = a.split('');
    let asc = '';
    let string = '';
    
    for (let i = 0; i < b.length; i++) {
        if (b[i] === '|') {
            let char = String.fromCharCode(parseInt(asc));
            string += char;
            asc = '';
        } else {
            let ind = ref.indexOf(b[i]);
            asc += ind.toString();
        }
    }
    
    return string;
}

function compress(a) {
    let string = '';
    let i = 0;
    
    while (i < a.length) {
        let count = 1;
        let c = a[i];
        let j = i;
        
        while (j < a.length - 1) {
            if (a[j] === a[j + 1]) {
                count++;
                j++;
            } else {
                break;
            }
        }
        
        string += c + count.toString();
        i = j + 1;
    }
    
    return string.replace(/1/g, '');
}

function dcompress(a) {
    let string = '';
    let b = a.split('');
    let j = 0;
    
    for (let i = 0; i < b.length; i++) {
        if (/^\d+$/.test(b[i])) {
            while (j < parseInt(b[i]) - 1) {
                string += b[i - 1];
                j++;
            }
        } else {
            string += b[i];
            j = 0;
        }
    }
    
    return string;
}

function getEncode(a) {
    let lst = a.split('');
    let string1 = '';
    
    for (let i = 0; i < lst.length; i++) {
        let ascii_value = lst[i].charCodeAt(0);
        let octal_value = ascii_value.toString(8);
        let binary_value = Number(octal_value).toString(2);
        let hex_value = Number(binary_value).toString(16);
        let n = generate_int();
        string1 += String.fromCharCode(n) + hex_value.replace('0x', '');
    }
    let string2 = rot(string1 + String.fromCharCode(generate_int()));
    let encoded_string = special_encode(string2);
    
    return compress(encoded_string);
}

function getDecode(c) {
    let a = special_decode(dcompress(c));
    let b = rot(a).split('');
    let string = '';
    let decoded_string = '';
    let string_lst = [];
    
    for (let i = 0; i < b.length; i++) {
        if (!check_ascii(b[i].charCodeAt(0))) {
            string += b[i];
        }
        
        if (string !== '' && check_ascii(b[i].charCodeAt(0))) {
            string_lst.push(string);
            string = '';
        }
    }
    for (let j = 0; j < string_lst.length; j++) {
        let hexToint = parseInt(string_lst[j], 16);
        let binToint = parseInt(hexToint, 2);
        let octToint = parseInt(binToint, 8);
        let intToascii = String.fromCharCode(octToint);
        decoded_string += intToascii;
    }
    
    return decoded_string;
}
