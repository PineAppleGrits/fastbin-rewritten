import css from './TheHeader.module.scss';

import { Col, Row, Select, Tooltip } from '@geist-ui/react';
import { FilePlus, Icon, Info } from '@geist-ui/react-icons';
import Link from 'next/link';

import languages from '@/lib/languages';

import { useState, useEffect } from 'react';
import checkMobile from 'ismobilejs';

export interface NavigationItem {
  url?: string;
  external?: boolean;
  icon: Icon;
  tooltip: string;
  onClick?(): any;
}

export interface TheHeaderProps {
  items: NavigationItem[];
  displayLanguages?: boolean;
  documentLanguage?: string;
  setDocumentLanguage?(language: string): any;
}

const TheHeader = ({
  items,
  displayLanguages,
  documentLanguage,
  setDocumentLanguage
}: TheHeaderProps) => {
  const navigationItems = [
    {
      url: '/',
      tooltip: 'New (ctrl+i)',
      icon: FilePlus
    },
    {
      url: '/about',
      tooltip: 'About',
      icon: Info
    },

    ...items
  ];

  const [ headerClasses, setHeaderClasses ] = useState([ css.wrapper, css.mobileHeader ].join(' '));
  const [ tooltipPlacement, setTooltipPlacement ] = useState<'bottom' | 'top'>('bottom');

  useEffect(() => {
    const isMobile = checkMobile(window.navigator).any;

    if (isMobile) {
      setTooltipPlacement('top');
    } else {
      setHeaderClasses(css.wrapper);
    }
  }, []);

  return (
    <header className={headerClasses}>
      <Row align="middle" justify="space-between" style={{ height: '65px' }}>
        <Col style={{ width: 'auto' }} className={css.sitename}>
          <h1>PasteCode<sup><small><strong>v1</strong></small></sup></h1>
        </Col>

        <Col className={css.navigationWrapper}>
          <Row align="middle" gap={.8}>
            {displayLanguages && (
              <Col className={css.languageRow}>
                <Select initialValue={documentLanguage || 'plain'} onChange={setDocumentLanguage}>
                  {Object.keys(languages).map(id => {
                    const language = languages[id];

                    return (
                      <Select.Option
                        value={language.id}
                        key={id}
                      >
                        {language.name}
                      </Select.Option>
                    );
                  })}
                </Select>
              </Col>
            )}

            <Col>
              {navigationItems.map((item, idx) => (
                <Tooltip key={idx} text={item.tooltip} placement={tooltipPlacement} className={css.navItem}>
                  {item.url && !item.external && <Link href={item.url}>
                    <a>
                      <item.icon size={36} />
                    </a>
                  </Link>}

                  {item.url && item.external && <a href={item.url}>
                    <item.icon size={36} />
                  </a>}

                  {item.onClick && <item.icon onClick={item.onClick} size={36} />}
                </Tooltip>
              ))}
            </Col>
          </Row>
        </Col>
      </Row>
    </header>
  );
};

export default TheHeader;
