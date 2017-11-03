for(let i = 0; i < 30; i++)
    tile(i);

function tile(num) {
    let sum = 0, diameter, ring_number, delta;
    for (ring_number = 1; ring_number < 10; ring_number++) {
        diameter = ring_number * 2;
        let border = 4 * (ring_number * 2);
        if (num < sum + border) {
            delta = num - sum;
            break;
        }

        // 4*i*2 is number of tiles in the tile border of a square with tile radius i
        // sum is the number of tiles in a
        sum += border;
    }

    let delta2 = delta % diameter;
    let side_num = Math.floor(delta / diameter);

    let LEFT = -ring_number;
    let RIGHT = ring_number;
    let TOP = -ring_number;
    let BOTTOM = ring_number;

    switch (side_num) {
        case 0:
            console.log(num, LEFT + delta2, TOP);
            break;
        case 1:
            console.log(num, RIGHT, TOP + delta2);
            break;
        case 2:
            console.log(num, RIGHT - delta2, BOTTOM);
            break;
        case 3:
            console.log(num, LEFT, BOTTOM - delta2);
            break;
    }

}