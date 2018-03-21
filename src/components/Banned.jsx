import React, {Component} from 'react';

class Banned extends Component {
    constructor(props) {
        super(props)
    }
    humanReadableTime = s => {
        let hh = ~~(s/(60*60));
        let mm = ~~(s/60%60);
        let ss = ~~(s%60);
        const zero = x => x < 10 ? '0'+x : x;
        return `${zero(hh)}ч. ${zero(mm)}м. ${zero(ss)}с.`;
    }
    render() {
        return(
            <div className="text-center">
                <p>Слишком много запросов с этого IP. Разбан через: {this.humanReadableTime(this.props.secondsLeft)}</p>
                <p>Можно применить <a href="https://ultrasurf.us/" target="_blank">ultrasurf</a> :)</p>
            </div>
        )
    }
}

export default Banned