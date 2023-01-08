const emojies = [
    ['😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '☺️', '😊', '😇', '🙂', '🙃', '😉', '🍏','🛳'],
    ['😌', '😍', '🥰', '😘', '😗', '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓','💎'],
    ['😎', '🤩', '🥳', '😏', '😒', '😞', '😔', '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩','🔮'],
    ['🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', '🥶', '😱', '😨', '😰', '😥','🏺'],
    ['😓', '🤗', '🤔', '🤭', '🤫', '🤥', '😶', '😐', '😑', '😬', '🙄', '😯', '😦', '😧', '😮','🧿'],
    ['😲', '🥱', '😴', '🤤', '😪', '😵', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕', '🤑','🧺'],
    ['🎶', '🤠', '😈', '👿', '👹', '👺', '🤡', '💀', '👻', '☠️', '👽', '🙏', '🐢', '🐙', '🦑', '🦐','🛎'],
    ['🦞', '🦀', '🐡', '🐠', '🐟', '🐬', '🐳', '🐋', '🦈', '🐊', '🐪', '🐘', '🐫', '🐄', '🐎','↖︎'],
    ['🐖', '🐏', '🐑', '🦙', '🐐', '🦌', '🐕', '🐩', '🐷', '🐸', '🐈', '🐓', '🦃', '🦚', '🦜','🧧'],
    ['🦢', '🦩', '🕊', '🐇', '🦝', '🦨', '🦡', '🦦', '🦥', '🐁', '🐀', '🐿', '🦔', '🐉', '🐲','📧'],
    ['🌵', '🎄', '🌲', '🌳', '🌴', '🌱', '🌿', '☘️', '🍀', '🎍', '🎋', '🍃', '🍂', '🍁', '🍄','🐤'],
    ['🐚', '📈', '🗄', '📘', '📕', '📐', '🔎', '🔍', '🔒', '📱', '💻', '⌚️', '⌨️', '🖥', '🖨','🐦'],
    ['📷', '📸', '📹', '📞', '📡', '🔋', '⌛️', '🐣', '💎', '⚖️', '🧲', '💈', '🔬', '🔭', '🧬','🐔'],
    ['🔑', '🗝', '🎁', '🎉', '🎊', '📦', '📬', '📯', '📌', '🧮', '☯️', '☢️', '☣️', '🐧', '💮','🐵'],
    ['㊙️', '🐮', '🆘', '🛑', '❗️', '🦁', '‼️', '⁉️', '⚠️', '🔰', '♻️', '🌐', '💠', '🌀', '🎵','🐯'],
    ['🐨', '🐼', '🐻', '🦊', '🐰', '🐹', '🐭', '🐱', '🐶', '🥽', '💍', '👑', '🎩', '👨', '⛽️','🤘'],
]
function emojiLen(e) { 
    for(let i=0;; i++) { 
      if(isNaN(e.charCodeAt(i))) { return i } 
    }
}
for (let i = 0; i < emojies.length; i++) {
    for (const e of emojies[i]) {
        if(emojiLen(e)!=2){
            console.log('Ne validno emoji',e);
        }
    }
    
}
function asbytes(s) {
    let bs = Buffer.from(s);
    let ars = [];
    for (let e of bs) {
        ars.push(e);
    }
    return ars;
}
function frombytes(ars) {
    let bs = Buffer.alloc(ars.length);
    for (let i in ars) {
        bs[i] = ars[i];
    }
    return bs.toString();
}

function encode(s, key) {
    // let key = await rl.question('key is ');
    const emojies2 = shuffle(key);
    let ns = '';
    let bytes = asbytes(s);
    console.log(s);
    for (let i = 0; i < bytes.length; i++) {
        let key1 = parseInt(bytes[i] / 16);
        let key2 = (bytes[i] % 16);
        ns += emojies2[key1][key2];
    }
    console.log('encode is', ns);
    return ns;
}
function decodeemoj(emoji, emojies) {
    for (const i in emojies) {
        let key1 = i;
        let key2 = emojies[i].indexOf(emoji);
        // console.log(key2,key1,emoji);
        if (key2 !== -1) {
            return key1 * 16 + key2;
        }
    }
}
function decode(s, key) {
    // let key = await rl.question('key is ');
    const emojies2 = shuffle(key);
    let ns = [];
    for (let i = 0; i < s.length; i += 2) {
        ns.push(decodeemoj(s[i] + s[i + 1], emojies2));
    }
    console.log('decode is', frombytes(ns));
    return frombytes(ns);
}

function shuffle1(key, emojies) {
    let emojies2 = [];
    for (const e of emojies) {
        emojies2.push([...e]);
    }
    let bk = asbytes(key);
    for (const e of bk) {
        let row = parseInt(e / 16);
        let koll = (e % 16);
        for (const key in emojies2) {
            emojies2[key] = cutarray(emojies2[key], koll);
        }
        emojies2 = cutarray(emojies2, row);

    }
    return emojies2;
}
function shuffle(key) {
    return shuffle1(key,
        shuffle1(key,
            shuffle1(key,
                shuffle1(key,
                    shuffle1(key, emojies)
                )
            )
        )
    )
}

function cutarray(arr, n) {
    const a1 = arr.slice(0, n);
    const a2 = arr.slice(n);
    return a2.concat(a1);
}


module.exports={decode,encode}
