import * as React from 'react';
export default 'svgr-mock';
const SvgrMock = React.forwardRef((props, ref) => <span ref={ref} {...props} />);
export const ReactComponent = SvgrMock;
