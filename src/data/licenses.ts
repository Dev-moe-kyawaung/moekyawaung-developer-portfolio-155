import { LicenseInfo } from '../types';

export const LICENSES: LicenseInfo[] = [
  {
    id: 'mit',
    spdxId: 'MIT',
    name: 'MIT License',
    category: 'permissive',
    summary: 'A short and simple permissive license with conditions only requiring preservation of copyright and license notices.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: ['License and copyright notice'],
    limitations: ['Liability', 'Warranty'],
    templateText: `MIT License

Copyright (c) {YEAR} {FULL_NAME}

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.`
  },
  {
    id: 'apache-2.0',
    spdxId: 'Apache-2.0',
    name: 'Apache License 2.0',
    category: 'permissive',
    summary: 'A permissive license whose main conditions require preservation of copyright and license notices. Contributors provide an express grant of patent rights.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent use', 'Private use'],
    conditions: ['License and copyright notice', 'State changes'],
    limitations: ['Liability', 'Trademark use', 'Warranty'],
    templateText: `Copyright {YEAR} {FULL_NAME}

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.`
  },
  {
    id: 'gpl-3.0',
    spdxId: 'GPL-3.0',
    name: 'GNU General Public License v3.0',
    category: 'copyleft',
    summary: 'Permissions of this strong copyleft license are conditioned on making available complete source code of licensed works and modifications.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent use', 'Private use'],
    conditions: ['Disclose source', 'License and copyright notice', 'Same license', 'State changes'],
    limitations: ['Liability', 'Warranty'],
    templateText: `GNU GENERAL PUBLIC LICENSE
Version 3, 29 June 2007

Copyright (C) {YEAR} {FULL_NAME}

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.`
  },
  {
    id: 'bsd-3-clause',
    spdxId: 'BSD-3-Clause',
    name: 'BSD 3-Clause "New" or "Revised" License',
    category: 'permissive',
    summary: 'A permissive license similar to the BSD 2-Clause License, but with a 3rd clause prohibiting others from using the name of the copyright holder for endorsement.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: ['License and copyright notice'],
    limitations: ['Liability', 'Warranty'],
    templateText: `BSD 3-Clause License

Copyright (c) {YEAR}, {FULL_NAME}
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.`
  },
  {
    id: 'mpl-2.0',
    spdxId: 'MPL-2.0',
    name: 'Mozilla Public License 2.0',
    category: 'copyleft',
    summary: 'Permissions of this weak copyleft license are conditioned on making available source code of licensed files and modifications under the same license.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Patent use', 'Private use'],
    conditions: ['Disclose source', 'License and copyright notice', 'Same license (file-level)'],
    limitations: ['Liability', 'Trademark use', 'Warranty'],
    templateText: `This Source Code Form is subject to the terms of the Mozilla Public
License, v. 2.0. If a copy of the MPL was not distributed with this
file, You can obtain one at https://mozilla.org/MPL/2.0/.

Copyright (c) {YEAR} {FULL_NAME}`
  },
  {
    id: 'unlicense',
    spdxId: 'Unlicense',
    name: 'The Unlicense',
    category: 'public-domain',
    summary: 'A license with no conditions whatsoever which dedicates works to the public domain. Unlicensed works, modifications, and larger works may be distributed under different terms.',
    permissions: ['Commercial use', 'Modification', 'Distribution', 'Private use'],
    conditions: [],
    limitations: ['Liability', 'Warranty'],
    templateText: `This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain.`
  }
];
