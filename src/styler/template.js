import React from 'react'
import withStyle from 'react-jss'

function styleTemplate(templateClassName, styles) {
  const TemplateTarget = ({classes, children}) => (
    <div className={classes[templateClassName]}>
      {children}
    </div>
  )

  return withStyle({ [templateClassName]: styles })(TemplateTarget)
}

export default styleTemplate
