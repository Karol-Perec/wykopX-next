/* eslint-disable react/no-array-index-key */
import { Fragment } from 'react';
import { DOMParser as NodeDOMParser } from '@xmldom/xmldom';
import { ExternalNoPropagationLink, NoPropagationLink } from 'components/UI/CustomLinks';
import Spoiler from 'components/UI/Spoiler';

const encodeUtf8 = (message: string) => {
  const query = new URLSearchParams(message);
  return Array.from(query)?.[0].join(' ');
};

const parseSpoilerText = (text: string | null) =>
  text?.split(' ').map((word, idx) => {
    if (word.startsWith('#')) {
      return (
        <Fragment key={idx}>
          <NoPropagationLink href={`/tag/${word.substring(1)}`}>{word}</NoPropagationLink>{' '}
        </Fragment>
      );
    }
    if (word.startsWith('@')) {
      return (
        <Fragment key={idx}>
          <NoPropagationLink href={`/ludzie/${word.substring(1)}`}>{word}</NoPropagationLink>{' '}
        </Fragment>
      );
    }
    if (word.startsWith('http')) {
      return (
        <Fragment key={idx}>
          <ExternalNoPropagationLink href={word}>{word}</ExternalNoPropagationLink>{' '}
        </Fragment>
      );
    }
    return `${word} `;
  });

const parseTextNode = (text: string | null) => {
  if (!text || text === '\\n') return null;
  if (text.endsWith('#') || text.endsWith('@')) return text.slice(0, -1);
  return text;
};

const parseElementNode = (node: HTMLElement) => {
  switch (node.tagName.toLowerCase()) {
    case 'br':
      return <br />;
    case 'cite':
      return (
        <cite>
          {node.childNodes.length ? parseNodes(node.childNodes) : parseTextNode(node.textContent)}
        </cite>
      );
    case 'strong':
      return (
        <strong>
          {node.childNodes.length ? parseNodes(node.childNodes) : parseTextNode(node.textContent)}
        </strong>
      );
    case 'em':
      return (
        <em>
          {node.childNodes.length ? parseNodes(node.childNodes) : parseTextNode(node.textContent)}
        </em>
      );
    case 'a': {
      const href = node.attributes.getNamedItem('href')?.value!;
      const text = node.textContent;

      if (href.endsWith(`#${text}`)) {
        return <NoPropagationLink href={`/tag/${text}`}>{`#${text}`}</NoPropagationLink>;
      }
      if (href.endsWith(`@${text}`)) {
        return <NoPropagationLink href={`/ludzie/${text}`}>{`@${text}`}</NoPropagationLink>;
      }
      if (href.startsWith('spoiler:')) {
        return <Spoiler>{parseSpoilerText(encodeUtf8(href.replace('spoiler:', '')))}</Spoiler>;
      }
      if (href.startsWith('http')) {
        return <ExternalNoPropagationLink href={href}>{text}</ExternalNoPropagationLink>;
      }
      return null;
    }
    default:
      return null;
  }
};

const parseNodes = (nodes: NodeListOf<ChildNode>) =>
  Array.from(nodes).map((node, idx) => (
    <Fragment key={idx}>
      {'tagName' in node ? parseElementNode(node as HTMLElement) : parseTextNode(node.textContent)}
    </Fragment>
  ));

export const parseHtml = (text: string) => {
  if (!text) return null;

  const parser = new NodeDOMParser();
  const parsedText = parser.parseFromString(text, 'text/html');

  return parseNodes(parsedText.body ? parsedText.body.childNodes : parsedText.childNodes);
};
