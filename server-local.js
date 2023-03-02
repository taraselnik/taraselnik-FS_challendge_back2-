'use strict';

import { listen } from './express/server';

listen(3000, () => console.log('Local app listening on port 3000!'));
