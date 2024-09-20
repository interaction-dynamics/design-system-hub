import buildMock from '@/__mocks__/buildMock'
import { ColorStyle, ElevationStyle, TypographyStyle } from '../style'

const defaultColorStyle: ColorStyle = {
  id: 'foo',
  name: 'color',
  type: 'color',
  metadata: {
    color: '#ff1122',
  },
  providers: {},
}

export const mockColorStyle = buildMock(defaultColorStyle)

const defaultElevationStyle: ElevationStyle = {
  id: 'foo',
  name: 'shadow',
  type: 'elevation',
  metadata: {
    type: 'drop-shadow',
    color: '#ff1122',
    offsetX: 1,
    offsetY: 2,
    blurRadius: 3,
    spreadRadius: 4,
  },
  providers: {},
}

export const mockElevationStyle = buildMock(defaultElevationStyle)

const defaultTypographyStyle: TypographyStyle = {
  id: 'foo',
  name: 'shadow',
  type: 'typography',
  metadata: {
    fontFamily: 'Arial',
    fontSize: 12,
    fontWeight: 400,
    lineHeight: 1.5,
    letterSpacing: 1,
  },
  providers: {},
}

export const mockTypographyStyle = buildMock(defaultTypographyStyle)
