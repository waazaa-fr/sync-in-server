/*
 * Copyright (C) 2012-2025 Johan Legrand <johan.legrand@sync-in.com>
 * This file is part of Sync-in | The open source file sync and share solution
 * See the LICENSE file for licensing details
 */

export const ONLY_OFFICE_INTERNAL_URI = '/onlyoffice' // used by nginx as proxy
export const ONLY_OFFICE_CONTEXT = 'OnlyOfficeEnvironment'
export const ONLY_OFFICE_TOKEN_QUERY_PARAM_NAME = 'token' as const

export const ONLY_OFFICE_EXTENSIONS = {
  VIEWABLE: new Map([
    ['doc', 'word'],
    ['dotm', 'word'],
    ['dot', 'word'],
    ['fodt', 'word'],
    ['ott', 'word'],
    ['rtf', 'word'],
    ['txt', 'word'],
    ['mht', 'word'],
    ['mhtml', 'word'],
    ['html', 'word'],
    ['htm', 'word'],
    ['epub', 'word'],
    ['fb2', 'word'],
    ['sxw', 'word'],
    ['stw', 'word'],
    ['wps', 'word'],
    ['wpt', 'word'],
    ['pages', 'word'],
    ['docxf', 'word'],
    ['oform', 'word'],
    ['xls', 'cell'],
    ['xlsb', 'cell'],
    ['xltm', 'cell'],
    ['xlt', 'cell'],
    ['fods', 'cell'],
    ['ots', 'cell'],
    ['sxc', 'cell'],
    ['et', 'cell'],
    ['ett', 'cell'],
    ['numbers', 'cell'],
    ['ppt', 'slide'],
    ['pptx', 'slide'],
    ['ppsx', 'slide'],
    ['ppsm', 'slide'],
    ['pps', 'slide'],
    ['potm', 'slide'],
    ['pot', 'slide'],
    ['fodp', 'slide'],
    ['otp', 'slide'],
    ['sxi', 'slide'],
    ['dps', 'slide'],
    ['dpt', 'slide'],
    ['key', 'slide']
  ]),
  EDITABLE: new Map([
    ['doc', 'word'],
    ['docx', 'word'],
    ['dotx', 'word'],
    ['dotm', 'word'],
    ['docm', 'word'],
    ['odt', 'word'],
    ['ott', 'word'],
    ['rtf', 'word'],
    ['txt', 'word'],
    ['xls', 'cell'],
    ['xlsx', 'cell'],
    ['xltx', 'cell'],
    ['xlsm', 'cell'],
    ['ods', 'cell'],
    ['ots', 'cell'],
    ['csv', 'cell'],
    ['ppt', 'slide'],
    ['pptx', 'slide'],
    ['potx', 'slide'],
    ['potm', 'slide'],
    ['pptm', 'slide'],
    ['ppsm', 'slide'],
    ['ppsx', 'slide'],
    ['odp', 'slide'],
    ['otp', 'slide'],
    ['pdf', 'pdf']
  ])
}

export const ONLY_OFFICE_CONVERT_EXTENSIONS = {
  ALLOW_AUTO: new Set(['doc', 'xls', 'ppt']),
  FROM: new Set([
    'doc',
    'docm',
    'docx',
    'docxf',
    'dotx',
    'epub',
    'fb2',
    'html',
    'mhtml',
    'odt',
    'ott',
    'pdf',
    'rtf',
    'stw',
    'sxw',
    'txt',
    'wps',
    'wpt',
    'xps'
  ]),
  TO: new Set(['docx', 'docxf', 'dotx', 'epub', 'fb2', 'html', 'jpg', 'odt', 'ott', 'pdf', 'png', 'rtf', 'txt'])
}

export const ONLY_OFFICE_CONVERT_ERROR = new Map([
  [-9, 'error conversion output format'],
  [-8, 'error document VKey'],
  [-7, 'error document request'],
  [-6, 'error database'],
  [-5, 'incorrect password'],
  [-4, 'download error'],
  [-3, 'convert error'],
  [-2, 'convert error timeout'],
  [-1, 'convert unknown']
])
