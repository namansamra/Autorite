import { PlacementWithLogical, Text, Tooltip } from '@chakra-ui/react';

function TextShortner({
  text = '',
  tooltip = true,
  limit = 20,
  textStyle = {},
  placement = 'bottom',
  tooltipStyle = {},
}) {
  return (
    <Tooltip
      isDisabled={tooltip && text.length <= limit}
      hasArrow
      label={text}
      placement={placement as PlacementWithLogical}
      borderRadius="4px"
      fontSize="12px"
      {...tooltipStyle}
    >
      <Text {...textStyle}>{text.length > limit ? text.slice(0, limit) + '...' : text}</Text>
    </Tooltip>
  );
}

export default TextShortner;
