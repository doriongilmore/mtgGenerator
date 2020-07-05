const generalRegexp = /{[\dTQXSWEICBUGR/]+}/gi;
const cleanRegexp = /[\dTQXSWEICBUGR/]/gi;

const mana = {
    cleanRegexp,
    generalRegexp,
}

export default mana;
