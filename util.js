const fs = require('fs')
const path = require('path')

const str = fs.readFileSync(path.resolve(__dirname, 'src/styles/_color.scss'))


const temp = str.toString().split('\n')

fs.writeFileSync(
    './output.scss',
    temp.reduce((prev, cur) => {
        if(!cur) {
            return prev
        }
        const [, name] = cur.match(/\$(.*).*:/)

        return prev += `.text-${name.trim()}{
            color: $${name.trim()} !important;
        }\n`
    }, '')
)

