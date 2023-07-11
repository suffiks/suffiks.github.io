#!/bin/bash

JSONFILE=${JSONFILE:-../suffiks/extension/wasi/wasi_env.json}
TARGET=${TARGET:-./content/en/docs/extensions/wasi/runtime.md}

functions=$(jq -rc '.[] | .' "$JSONFILE")

cat << EOF | tee "$TARGET"
---
title: "Runtime"
description: "WASI Suffiks runtime."
lead: "WASI Suffiks runtime."
menu:
  docs:
    parent: "wasi"
weight: 1000
toc: true
---

## Module \`suffiks\`
All the following functions are available in the \`suffiks\` module.

This documentation is generated from the [WASI env](https://github.com/suffiks/suffiks/blob/wasi/extension/wasi/wasi_env.json) generated file,
which you can use to generate your own code.

EOF

while read -r func; do
	name=$(jq -r '.name' <<< "$func")
	echo "### $name" | tee -a "$TARGET"
	echo | tee -a "$TARGET"

	doc=$(jq -r '.doc' <<< "$func")
	if [ "$doc" != "" ]; then
		echo "$doc" | tee -a "$TARGET"
		echo | tee -a "$TARGET"
	fi

	args=$(jq -rc '.args | .[] | .' <<< "$func")
	if [ "$args" != "" ]; then
		echo "**Arguments**" | tee -a "$TARGET"
		echo | tee -a "$TARGET"
		while read -r arg; do
			arg_name=$(jq -r '.name' <<< "$arg")
			arg_type=$(jq -r '.type' <<< "$arg")
			echo "* \`$arg_name\` (\`$arg_type\`)" | tee -a "$TARGET"
		done <<< "$args"
		echo | tee -a "$TARGET"
	fi

	returns=$(jq -rc '.return | .[] | .' <<< "$func")
	if [ "$returns" != "" ]; then
		echo "**Returns**" | tee -a "$TARGET"
		echo | tee -a "$TARGET"
		while read -r ret; do
			# ret_name=$(jq -r '.name' <<< "$ret")
			ret_type=$(jq -r '.type' <<< "$ret")
			# echo "* \`$ret_name\` ($ret_type)"
			echo "* \`$ret_type\`" | tee -a "$TARGET"
		done <<< "$returns"
		echo | tee -a "$TARGET"
	fi

done <<< "$functions"
