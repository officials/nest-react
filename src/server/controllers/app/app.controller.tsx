import React from 'react';

import { Controller, Get, Req, Res, Next } from '@nestjs/common';

import { Request, Response } from 'express';
import { renderToString } from 'react-dom/server';
import App from '../../entry/index.js';
import { createReadStream } from 'fs';
import { join } from 'path';
import { StaticRouter } from 'react-router-dom';
@Controller('*')
export class AppController {
  @Get()
  async wocao(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: any,
  ): Promise<any> {
    const readCss = function() {
      return new Promise((resolve: any) => {
        const stream = createReadStream(
          join(__dirname, '../../entry/index.css'),
        );
        stream.on('data', function(data) {
          resolve(`<style>${String(data)}</style>`);
        });
      });
    };

    // 解析组件
    const frontComponents = renderToString(
      <StaticRouter>
        <App />
      </StaticRouter>,
    );
    console.log(frontComponents);
    //动态title
    const htmlTitle = `TkCreator`;
    if (req.url.includes('api')) {
      next();
    } else {
      const cssString: unknown = await readCss();
      res.render('index', {
        htmlTitle,
        content: frontComponents,
        cssString,
      });
    }
  }
}
