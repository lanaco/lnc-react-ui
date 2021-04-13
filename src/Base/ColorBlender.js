export const getLighterColor = (color, percent) => {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    percent = (percent < 1) ? percent : 1;
    percent = (percent > 0) ? percent : 0;

    R = parseInt(R + percent * (255 - R));
    G = parseInt(G + percent * (255 - G));
    B = parseInt(B + percent * (255 - B));

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

export const getDarkerColor = (color, percent) => {

    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    percent = (percent < 1) ? percent : 1;
    percent = (percent > 0) ? percent : 0;



    R = parseInt(R - (percent * R));
    G = parseInt(G - (percent * G));
    B = parseInt(B - (percent * B));

    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

export const isColorDark = color => {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);

    const hsp = Math.sqrt(
        0.299 * (R * R) +
        0.587 * (G * G) +
        0.114 * (B * B)
    );

    if (hsp > 127.5) {
        return false;
    }
    return true;
}